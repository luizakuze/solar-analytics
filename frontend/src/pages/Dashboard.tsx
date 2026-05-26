import { useEffect, useState } from "react";

import { MetricCard } from "../components/MetricCard";
import { MetricForm } from "../components/MetricForm";
import { MetricsChart } from "../components/MetricsChart";

import { getMetrics, getMetricsSummary } from "../services/api";

type MetricsSummary = {
  average_estimated_efficiency: number;
  average_panel_temperature: number;
  average_power_kw: number;
  average_solar_irradiation: number;
  max_power_kw: number;
  total_records: number;
};

type Metric = {
  id: number;
  timestamp: string;
  power_kw: number;
  panel_temperature: number;
  solar_irradiation: number;
  estimated_efficiency: number;
};

type ChartData = {
  name: string;
  value: number;
};

export function Dashboard() {
  const [summary, setSummary] = useState<MetricsSummary | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");

  async function loadDashboardData() {
    const summaryResponse = await getMetricsSummary();
    setSummary(summaryResponse);

    const metricsResponse: Metric[] = await getMetrics();

    const formattedChartData = metricsResponse.map((metric) => ({
      name: new Date(metric.timestamp).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      value: metric.power_kw,
    }));

    setChartData(formattedChartData);

    setLastUpdate(
      new Date().toLocaleString("pt-BR")
    );
  }

  useEffect(() => {
    loadDashboardData().catch((error) =>
      console.error("Erro ao buscar dados:", error)
    );
  }, []);

  if (!summary) {
    return <p>Carregando dados...</p>;
  }

  return (
    <main className="dashboard">
      <div className="dashboard-layout">
        <section className="dashboard-main">
          <header className="dashboard-header">
            <div className="brand">
              <span className="brand-icon">☀</span>

              <div>
                <h1>Solar Analytics</h1>

                <p>
                  Monitoramento da geração de energia solar
                </p>
              </div>
            </div>

            <div className="last-update">
              <div>
                <small>Última atualização</small>

                <strong>{lastUpdate}</strong>
              </div>
            </div>
          </header>

          <section className="metrics-grid">
            <MetricCard
              icon="↯"
              title="Média de geração"
              value={`${summary.average_power_kw} kW`}
              subtitle="Potência média"
            />

            <MetricCard
              icon="↗"
              title="Pico de geração"
              value={`${summary.max_power_kw.toFixed(2)} kW`}
              subtitle="Maior valor registrado"
            />

            <MetricCard
              icon="🌡"
              title="Temperatura média"
              value={`${summary.average_panel_temperature} °C`}
              subtitle="Temperatura dos painéis"
            />

            <MetricCard
              icon="☀"
              title="Irradiação média"
              value={`${summary.average_solar_irradiation} W/m²`}
              subtitle="Irradiação solar média"
            />

            <MetricCard
              icon="⚙"
              title="Eficiência média"
              value={summary.average_estimated_efficiency}
              subtitle="Eficiência estimada"
            />

            <MetricCard
              icon="🗂"
              title="Total de registros"
              value={summary.total_records}
              subtitle="Leituras cadastradas"
            />
          </section>

          <section className="chart-card">
            <div className="chart-header">
              <h2>Produção por período</h2>
            </div>

            <MetricsChart data={chartData} />
          </section>
        </section>

        <MetricForm onMetricCreated={loadDashboardData} />
      </div>
    </main>
  );
}