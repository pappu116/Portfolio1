"use client";

import type { ComponentType } from "react";
import {
  FaAws,
  FaBrain,
  FaChartLine,
  FaCloudArrowUp,
  FaCode,
  FaDatabase,
  FaDiagramProject,
  FaDocker,
  FaGithub,
  FaHeartPulse,
  FaLaptopCode,
  FaLayerGroup,
  FaMobileScreenButton,
  FaNodeJs,
  FaPalette,
  FaPython,
  FaReact,
  FaServer,
  FaVuejs,
} from "react-icons/fa6";

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  "brand:react": FaReact,
  "brand:node": FaNodeJs,
  "brand:python": FaPython,
  "brand:docker": FaDocker,
  "brand:aws": FaAws,
  "brand:github": FaGithub,
  "brand:vue": FaVuejs,
  "solid:code": FaCode,
  "solid:database": FaDatabase,
  "solid:diagram": FaDiagramProject,
  "solid:palette": FaPalette,
  "solid:mobile": FaMobileScreenButton,
  "solid:brain": FaBrain,
  "solid:laptop": FaLaptopCode,
  "solid:chart": FaChartLine,
  "solid:pulse": FaHeartPulse,
  "solid:server": FaServer,
  "solid:cloud": FaCloudArrowUp,
  "solid:layer": FaLayerGroup,
};

export default function Icon({
  iconKey,
  className,
}: {
  iconKey?: string;
  className?: string;
}) {
  const Cmp = (iconKey && ICON_MAP[iconKey]) || FaLaptopCode;
  return <Cmp className={className} />;
}
