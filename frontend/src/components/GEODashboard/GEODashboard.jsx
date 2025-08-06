import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const DashboardContainer = styled.div`
  padding: 2rem;
  background: #0f3460;
  border-radius: 15px;
  margin: 2rem 0;
  color: white;
`;

const DashboardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #e94560;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const MetricCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #e94560;
  margin-bottom: 0.5rem;
`;

const MetricLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
`;

const ChartContainer = styled.div`
  height: 200px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 1rem;
`;

const ChartBar = styled.div`
  width: 30px;
  background: linear-gradient(to top, #e94560, #ff6b81);
  border-radius: 5px 5px 0 0;
  position: relative;
`;

const BarLabel = styled.div`
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.7);
`;

const GEODashboard = () => {
  const [metrics, setMetrics] = useState({
    aiAppearances: 0,
    faqClicks: 0,
    structuredContentViews: 0,
    geoConversions: 0,
    avgTimeOnPage: 0
  });

  // Simular datos de métricas
  useEffect(() => {
    // En una implementación real, estos datos vendrían de una API
    const mockMetrics = {
      aiAppearances: 142,
      faqClicks: 287,
      structuredContentViews: 456,
      geoConversions: 32,
      avgTimeOnPage: 187
    };
    
    setMetrics(mockMetrics);
  }, []);

  // Datos simulados para el gráfico
  const chartData = [
    { label: 'Lun', value: 65 },
    { label: 'Mar', value: 78 },
    { label: 'Mié', value: 90 },
    { label: 'Jue', value: 81 },
    { label: 'Vie', value: 89 },
    { label: 'Sáb', value: 95 },
    { label: 'Dom', value: 100 }
  ];

  return (
    <DashboardContainer>
      <DashboardTitle>Métricas de GEO (Generative Engine Optimization)</DashboardTitle>
      
      <MetricsGrid>
        <MetricCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MetricValue>{metrics.aiAppearances}</MetricValue>
          <MetricLabel>Apariciones en IA</MetricLabel>
        </MetricCard>
        
        <MetricCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <MetricValue>{metrics.faqClicks}</MetricValue>
          <MetricLabel>Clics en FAQ</MetricLabel>
        </MetricCard>
        
        <MetricCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <MetricValue>{metrics.structuredContentViews}</MetricValue>
          <MetricLabel>Vistas de Contenido Estructurado</MetricLabel>
        </MetricCard>
        
        <MetricCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <MetricValue>{metrics.geoConversions}</MetricValue>
          <MetricLabel>Conversiones GEO</MetricLabel>
        </MetricCard>
        
        <MetricCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <MetricValue>{Math.round(metrics.avgTimeOnPage / 60)}m {metrics.avgTimeOnPage % 60}s</MetricValue>
          <MetricLabel>Tiempo Promedio</MetricLabel>
        </MetricCard>
      </MetricsGrid>
      
      <h4>Distribución de Apariciones en IA (Últimos 7 días)</h4>
      <ChartContainer>
        {chartData.map((data, index) => (
          <div key={index} style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ChartBar style={{ height: `${data.value}%` }}>
              <BarLabel>{data.label}</BarLabel>
            </ChartBar>
          </div>
        ))}
      </ChartContainer>
    </DashboardContainer>
  );
};

export default GEODashboard;
