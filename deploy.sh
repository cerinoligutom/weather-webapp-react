docker build -t zeferinix/weather-webapp-react:latest .
docker push zeferinix/weather-webapp-react:latest
ssh root@66.42.56.111 "docker pull zeferinix/weather-webapp-react:latest && docker tag zeferinix/weather-webapp-react:latest dokku/weather.zeferinix.com:latest && dokku tags:deploy weather.zeferinix.com latest"
