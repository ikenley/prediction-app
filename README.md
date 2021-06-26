# prediction-app

A simple web app which allows you to make predictions, set reminders, and self-assess one's track record. Based on superforcasters (citation needed)

See it live at [predictions.ikenley.com](https://predictions.ikenley.com/)

Forked from [template-application](https://github.com/ikenley/template-application)
Hosted on [template-infrastructure](https://github.com/ikenley/template-infrastructure)

---

## docker-compose

- [documentation](https://docs.docker.com/compose/)
- [docker-compose file reference](https://docs.docker.com/compose/compose-file/compose-file-v3/)
- Based on the [.NET Core AWS guide](https://aws.amazon.com/blogs/compute/hosting-asp-net-core-applications-in-amazon-ecs-using-aws-fargate/)

```
docker-compose build
docker-compose up

docker-compose stop
docker-compose rm
docker-compose rmi ‘containerimageid’
```
