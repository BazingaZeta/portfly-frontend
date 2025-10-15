import styles from './dashboard.module.css';
import ProfitTrendChart from './ProfitTrendChart';
import PortfolioHoldings from './PortfolioHoldings';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-6">Welcome back! Here&apos;s a summary of your account.</p>

      <div className={styles.chartContainer}>
        <h2 className="text-xl font-bold mb-4">Portfolio Performance (90 Days)</h2>
        <ProfitTrendChart />
      </div>

      <PortfolioHoldings />

    </div>
  );
}
