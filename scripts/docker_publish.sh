# Build and push docker image to ECR

TAG=$1

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 924586450630.dkr.ecr.us-east-1.amazonaws.com

cd api
docker build -t ik-test-prediction-lambda .

docker tag ik-test-prediction-lambda:latest 924586450630.dkr.ecr.us-east-1.amazonaws.com/ik-test-prediction-lambda:${TAG}
docker push 924586450630.dkr.ecr.us-east-1.amazonaws.com/ik-test-prediction-lambda:${TAG}
