# Build and push docker image to ECR

TAG=$1

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 924586450630.dkr.ecr.us-east-1.amazonaws.com

cd api
docker build -t ik-dev-prediction-lambda .

docker tag ik-dev-prediction-lambda:latest 924586450630.dkr.ecr.us-east-1.amazonaws.com/ik-dev-prediction-lambda:${TAG}
docker push 924586450630.dkr.ecr.us-east-1.amazonaws.com/ik-dev-prediction-lambda:${TAG}

echo "Updating Lambda function code"
aws lambda update-function-code --no-paginate --function-name ik-dev-test-prediction-app --image-uri 924586450630.dkr.ecr.us-east-1.amazonaws.com/ik-dev-prediction-lambda:${TAG}
