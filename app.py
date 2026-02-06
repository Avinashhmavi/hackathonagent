import random
import asyncio
import logging
import uvicorn
from fastapi import FastAPI, HTTPException, status, Response

# Initialize FastAPI app
app = FastAPI(
    title="SRE Demo API",
    description="An API for demonstrating SRE principles and chaos engineering.",
    version="1.0.0",
)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

@app.get("/")
def home():
    """Root endpoint providing service status."""
    logging.info("Homepage accessed")
    return {"status": "running", "service": "sre-demo-app"}

@app.get("/api/latency")
async def latency(delay_ms: int = 100, timeout: bool = False):
    """Simulates a slow endpoint by delaying the response."""
    if delay_ms > 0:
        logging.info(f"Request received with a delay of {delay_ms}ms.")
        await asyncio.sleep(delay_ms / 1000.0)
    if timeout:
        logging.warning("Simulating a request timeout.")
        # This won't actually cause a client timeout, but simulates the log/error
        raise HTTPException(status_code=status.HTTP_504_GATEWAY_TIMEOUT, detail="Request timed out")
    return {"status": "success", "delay_ms": delay_ms}

@app.get("/api/kubernetes")
def kubernetes_error(error_type: str = "pod_crash"):
    """Simulates common Kubernetes-related failures."""
    logging.error(f"Simulating a Kubernetes error: {error_type}")
    if error_type == "pod_crash":
        # A 503 is appropriate for a service whose backing pod has crashed
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Service unavailable due to pod crash")
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unknown error_type specified")

@app.get("/api/chaos")
def chaos(failure_rate: float = 0.5):
    """Introduces random failures based on a given probability."""
    if random.random() < failure_rate:
        logging.error(f"Chaos endpoint triggered a failure with rate {failure_rate}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Random failure occurred")
    else:
        logging.info(f"Chaos endpoint succeeded with rate {failure_rate}")
        return {"status": "success", "message": "Request survived the chaos!"}

# The logs show the app is run by Uvicorn on port 8001.
# This block allows running the app directly for development.
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8001)
