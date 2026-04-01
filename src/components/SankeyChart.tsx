import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey } from 'd3-sankey';
import type { SankeyNode, SankeyLink } from 'd3-sankey';
import './sankey-chart.css';

export interface SankeyDataPoint {
  source: string;
  target: string;
  value: number;
  source_count?: number;
}

interface SankeyChartProps {
  data: SankeyDataPoint[];
}

interface NodeData {
  name: string;
  count?: number;
}

interface Particle {
  id: number;
  link: SankeyLink<NodeData, any>;
  progress: number;
  speed: number;
  x: number;
  y: number;
  offset: number;
}

const colorMap: Record<string, string> = {
  'Email Received': '#60a5fa', // blue-400
  'Processing': '#c084fc', // violet-400
  'Complete': '#34d399', // emerald-400
  'Needs Review': '#facc15', // yellow-400
};

export function SankeyChart({ data }: SankeyChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const linksRef = useRef<SankeyLink<NodeData, any>[]>([]);
  const lastSpawnRef = useRef<{ [key: number]: number }>({});
  const totalSpawnedRef = useRef<{ [key: number]: number }>({});
  const dataRef = useRef<SankeyDataPoint[]>(data);
  const widthRef = useRef<number>(0);
  const heightRef = useRef<number>(0);
  const linkWidthRef = useRef<number>(60);
  const curvePoint = (
    t: number,
    p0: number,
    p1: number,
    p2: number,
    p3: number,
  ) =>
    Math.pow(1 - t, 3) * p0 +
    3 * Math.pow(1 - t, 2) * t * p1 +
    3 * (1 - t) * Math.pow(t, 2) * p2 +
    Math.pow(t, 3) * p3;

  const curveDerivative = (
    t: number,
    p0: number,
    p1: number,
    p2: number,
    p3: number,
  ) =>
    3 * Math.pow(1 - t, 2) * (p1 - p0) +
    6 * (1 - t) * t * (p2 - p1) +
    3 * Math.pow(t, 2) * (p3 - p2);

  const getNodeCenterY = (name: string, innerHeight: number, fallbackY: number) => {
    const layoutMap: Record<string, number> = {
      'Email Received': 0.5,
      'Processing': 0.5,
      'Complete': 0.3,
      'Needs Review': 0.78,
    };

    const ratio = layoutMap[name];
    return ratio ? innerHeight * ratio : fallbackY;
  };

  const getLinkVisualWidth = (value: number) => {
    const minValue = 16;
    const maxValue = 120;
    const minWidth = 8;
    const maxWidth = 22;
    const normalized = Math.max(0, Math.min(1, (value - minValue) / (maxValue - minValue)));

    return minWidth + normalized * (maxWidth - minWidth);
  };

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const renderChart = (width: number, height: number) => {
    if (!svgRef.current || !data.length || width <= 0 || height <= 0) return;

    widthRef.current = width;
    heightRef.current = height;

    const LINK_WIDTH = Math.min(72, Math.max(20, height * 0.09));
    const NODE_THICKNESS = Math.min(26, LINK_WIDTH * 0.55);
    linkWidthRef.current = LINK_WIDTH;

    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const nodesArray: NodeData[] = [];
    const nodeMap = new Map<string, number>();
    const nodeCounts = new Map<string, number>();

    data.forEach(d => {
      if (d.source_count !== null && d.source_count !== undefined) {
        nodeCounts.set(d.source, d.source_count);
      }
    });

    data.forEach(d => {
      if (!nodeCounts.has(d.target)) {
        nodeCounts.set(d.target, d.value);
      }
    });

    data.forEach(d => {
      if (!nodeMap.has(d.source)) {
        nodeMap.set(d.source, nodesArray.length);
        nodesArray.push({ name: d.source, count: nodeCounts.get(d.source) ?? 0 });
      }
      if (!nodeMap.has(d.target)) {
        nodeMap.set(d.target, nodesArray.length);
        nodesArray.push({ name: d.target, count: nodeCounts.get(d.target) ?? 0 });
      }
    });

    const layoutLinks = data.map(d => ({
      source: nodeMap.get(d.source)!,
      target: nodeMap.get(d.target)!,
      value: d.value
    }));

    const nodeOrder: Record<string, number> = {
      'Email Received': 0,
      'Processing': 1,
      'Complete': 2,
      'Needs Review': 3,
    };

    const sankeyGenerator = sankey<NodeData, any>()
      .nodeWidth(6)
      .nodePadding(20)
      .nodeSort((a, b) => (nodeOrder[a.name] ?? 0) - (nodeOrder[b.name] ?? 0))
      .extent([[0, 0], [innerWidth, innerHeight]]);

    const graph = sankeyGenerator({
      nodes: nodesArray,
      links: layoutLinks
    });

    linksRef.current = graph.links;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const defs = svg.append('defs');

    graph.links.forEach((link, i) => {
      const sourceNode = link.source as SankeyNode<NodeData, any>;
      const targetNode = link.target as SankeyNode<NodeData, any>;

      const gradient = defs.append('linearGradient')
        .attr('id', `gradient-${i}`)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', sourceNode.x1 || 0)
        .attr('x2', targetNode.x0 || 0);

      const colorStart = colorMap[sourceNode.name] || '#a78bfa';
      const colorEnd = colorMap[targetNode.name] || '#67e8f9';

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', colorStart);

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', colorEnd);
    });

    g.append('g')
      .selectAll('path.link')
      .data(graph.links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d => {
        const sourceNode = d.source as SankeyNode<NodeData, any>;
        const targetNode = d.target as SankeyNode<NodeData, any>;
        const sourceY = getNodeCenterY(
          sourceNode.name,
          innerHeight,
          ((sourceNode.y0 || 0) + (sourceNode.y1 || 0)) / 2,
        );
        const targetY = getNodeCenterY(
          targetNode.name,
          innerHeight,
          ((targetNode.y0 || 0) + (targetNode.y1 || 0)) / 2,
        );

        const gap = 2;
        const sourceX = sourceNode.x1! + gap;
        const targetX = targetNode.x0! - gap;

        const curvature = 0.5;
        const xi = d3.interpolateNumber(sourceX, targetX);
        const x2 = xi(curvature);
        const x3 = xi(1 - curvature);

        return `M${sourceX},${sourceY}C${x2},${sourceY} ${x3},${targetY} ${targetX},${targetY}`;
      })
      .attr('stroke', (_d, i) => `url(#gradient-${i})`)
      .attr('stroke-width', d => getLinkVisualWidth(d.value))
      .attr('fill', 'none')
      .attr('opacity', 0.5);

    const node = g.append('g')
      .selectAll('g')
      .data(graph.nodes)
      .enter()
      .append('g');

    node.append('rect')
      .attr('x', d => d.x0 || 0)
      .attr('y', d => {
        const fallbackY = ((d.y0 || 0) + (d.y1 || 0)) / 2;
        const centerY = getNodeCenterY(d.name, innerHeight, fallbackY);
        return centerY - (NODE_THICKNESS / 2);
      })
      .attr('height', NODE_THICKNESS)
      .attr('width', d => (d.x1 || 0) - (d.x0 || 0))
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('fill', d => colorMap[d.name] || '#a78bfa')
      .attr('opacity', 0.95);

    node.append('text')
      .attr('x', d => (((d.x0 || 0) + (d.x1 || 0)) / 2))
      .attr('y', d => {
        const fallbackY = ((d.y0 || 0) + (d.y1 || 0)) / 2;
        const centerY = getNodeCenterY(d.name, innerHeight, fallbackY);
        return d.name === 'Needs Review'
          ? centerY + (NODE_THICKNESS / 2) + 16
          : centerY - (NODE_THICKNESS / 2) - 10;
      })
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', '500')
      .attr('fill', '#ffffff')
      .text(d => `${d.name} (${d.count ?? 0})`);

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      particlesRef.current = [];
      totalSpawnedRef.current = {};
      lastSpawnRef.current = {};
      renderChart(width, height);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [data]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const SPAWN_INTERVAL = 170;
    const MAX_PARTICLES_TOTAL = 48;
    const MAX_PARTICLES_PER_LINK = 14;

    let particleId = 0;
    let lastTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      const width = widthRef.current;
      const height = heightRef.current;

      ctx.clearRect(0, 0, width, height);

      linksRef.current.forEach((link, linkIndex) => {
        const lastSpawn = lastSpawnRef.current[linkIndex] || 0;
        
        // Spawn based on value
        if (
          currentTime - lastSpawn > SPAWN_INTERVAL &&
          particlesRef.current.length < MAX_PARTICLES_TOTAL
        ) {
          // Increase spawn rate for higher value links
          if (Math.random() < Math.min(0.35, 0.08 + (link.value * 0.0025))) {
            const visualWidth = getLinkVisualWidth(link.value);
            particlesRef.current.push({
              id: particleId++,
              link: link,
              progress: 0,
              speed: 0.04 + Math.random() * 0.025,
              offset: (Math.random() - 0.5) * (visualWidth * 0.22),
              x: 0,
              y: 0
            });
            lastSpawnRef.current[linkIndex] = currentTime;
          }
        }
      });

      particlesRef.current = particlesRef.current.filter(particle => {
        particle.progress += particle.speed * (deltaTime / 1000);

        if (particle.progress >= 1) return false;

        const link = particle.link;
        const sourceNode = link.source as SankeyNode<NodeData, any>;
        const targetNode = link.target as SankeyNode<NodeData, any>;

        const sourceY = getNodeCenterY(
          sourceNode.name,
          height - margin.top - margin.bottom,
          ((sourceNode.y0 || 0) + (sourceNode.y1 || 0)) / 2,
        );
        const targetY = getNodeCenterY(
          targetNode.name,
          height - margin.top - margin.bottom,
          ((targetNode.y0 || 0) + (targetNode.y1 || 0)) / 2,
        );
        const gap = 2;
        const sourceX = (sourceNode.x1 || 0) + gap + margin.left;
        const targetX = (targetNode.x0 || 0) - gap + margin.left;

        const t = particle.progress;
        const curvature = 0.5;
        const xi = d3.interpolateNumber(sourceX, targetX);
        const x2 = xi(curvature);
        const x3 = xi(1 - curvature);

        const p0x = sourceX;
        const p1x = x2;
        const p2x = x3;
        const p3x = targetX;
        const p0y = sourceY + margin.top;
        const p1y = sourceY + margin.top;
        const p2y = targetY + margin.top;
        const p3y = targetY + margin.top;

        const centerX = curvePoint(t, p0x, p1x, p2x, p3x);
        const centerY = curvePoint(t, p0y, p1y, p2y, p3y);
        const dx = curveDerivative(t, p0x, p1x, p2x, p3x);
        const dy = curveDerivative(t, p0y, p1y, p2y, p3y);

        const length = Math.sqrt(dx * dx + dy * dy);
        if (length === 0) {
          return true;
        }
        const perpX = -dy / length;
        const perpY = dx / length;

        particle.x = centerX + perpX * particle.offset;
        particle.y = centerY + perpY * particle.offset;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
        ctx.shadowBlur = 1.5;
        ctx.shadowColor = '#ffffff';
        ctx.fill();
        ctx.shadowBlur = 0; // Reset

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [data]);

  return (
    <div className="w-full">
      <div ref={containerRef} className="svg-wrapper w-full">
        <svg ref={svgRef} className="w-full h-full" />
        <canvas ref={canvasRef} className="particles-canvas w-full h-full" />
      </div>
    </div>
  );
}
