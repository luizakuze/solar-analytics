import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export type CreateMetricPayload = {
  power_kw: number;
  panel_temperature: number;
  solar_irradiation: number;
};

export async function getMetrics() {
  const response = await api.get("/metrics");
  return response.data;
}

export async function getMetricsSummary() {
  const response = await api.get("/metrics/summary");
  return response.data;
}

export async function createMetric(payload: CreateMetricPayload) {
  const response = await api.post("/metrics", payload);
  return response.data;
}