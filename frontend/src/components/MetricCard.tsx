type MetricCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
}: MetricCardProps) {
  return (
    <article className="metric-card">
      <div className="metric-icon">
        {icon}
      </div>

      <div className="metric-content">
        <h3>{title}</h3>
        <strong>{value}</strong>
        <p>{subtitle}</p>
      </div>
    </article>
  );
}