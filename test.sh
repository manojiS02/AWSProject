response=$(curl -s http://localhost:30001)
if [[ "$response" == *"Hello from the Coinbase service!"* ]]; then
  echo "Green Deployment Passed!"
else
  echo "Green Deployment Failed!" && exit 1
fi