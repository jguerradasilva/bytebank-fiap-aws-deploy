export default function HealthCheck() {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#4CAF50' }}>ByteBank App - Health Check</h1>
      <p>Status: <strong style={{ color: '#4CAF50' }}>Healthy</strong></p>
      <p>Version: {import.meta.env.VITE_APP_VERSION || '1.0.0'}</p>
      <p>Environment: {import.meta.env.VITE_NODE_ENV || 'development'}</p>
      <p>Timestamp: {new Date().toISOString()}</p>
      <div style={{ 
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        borderRadius: '5px'
      }}>
        <h3>Application Status</h3>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>✅ React App Running</li>
          <li>✅ Routing Active</li>
          <li>✅ Components Loaded</li>
          <li>✅ Ready to Serve</li>
        </ul>
      </div>
    </div>
  );
}
