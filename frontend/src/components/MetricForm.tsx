import { type FormEvent, useState } from "react";
import { createMetric } from "../services/api";

type MetricFormProps = {
  onMetricCreated: () => void;
};

export function MetricForm({ onMetricCreated }: MetricFormProps) {
  const [powerKw, setPowerKw] = useState("");
  const [panelTemperature, setPanelTemperature] = useState("");
  const [solarIrradiation, setSolarIrradiation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await createMetric({
        power_kw: Number(powerKw),
        panel_temperature: Number(panelTemperature),
        solar_irradiation: Number(solarIrradiation),
      });

      setPowerKw("");
      setPanelTemperature("");
      setSolarIrradiation("");

      onMetricCreated();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <aside className="form-panel">
      <div className="form-title">
        <span className="form-title-icon">＋</span>

        <div>
          <h2>Cadastrar métrica solar</h2>

          <p>
            Insira uma nova leitura de geração para atualizar o dashboard.
          </p>
        </div>
      </div>

      <form className="metric-form" onSubmit={handleSubmit}>
        <label>
          Potência gerada (kW)

          <div className="input-group">
            <div className="input-icon">↯</div>

            <input
              type="number"
              step="0.01"
              placeholder="Ex: 3.50"
              value={powerKw}
              onChange={(event) => setPowerKw(event.target.value)}
              required
            />

            <strong>kW</strong>
          </div>
        </label>

        <label>
          Temperatura do painel (°C)

          <div className="input-group">
            <div className="input-icon">🌡</div>

            <input
              type="number"
              step="0.01"
              placeholder="Ex: 42.1"
              value={panelTemperature}
              onChange={(event) => setPanelTemperature(event.target.value)}
              required
            />

            <strong>°C</strong>
          </div>
        </label>

        <label>
          Irradiação solar (W/m²)

          <div className="input-group">
            <div className="input-icon">☀</div>

            <input
              type="number"
              step="0.01"
              placeholder="Ex: 780"
              value={solarIrradiation}
              onChange={(event) => setSolarIrradiation(event.target.value)}
              required
            />

            <strong>W/m²</strong>
          </div>
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar leitura"}
        </button>
      </form>

      <div className="tips-box">
        <strong>Dicas</strong>

        <p>
          Certifique-se de inserir valores corretos para obter análises precisas.
        </p>
      </div>
    </aside>
  );
}