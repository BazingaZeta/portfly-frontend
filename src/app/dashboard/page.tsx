import styles from './dashboard.module.css';
import ProfitTrendChart from './ProfitTrendChart';

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>Welcome back! Here's a summary of your account.</p>

      <div className={styles.chartContainer}>
        <h2>Portfolio Performance (90 Days)</h2>
        <ProfitTrendChart />
      </div>

      <div>
        <h2>Quick Summary</h2>
        <p>This is where other dashboard widgets would go.</p>
      </div>

    </div>
  );
}