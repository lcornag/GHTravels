#!/usr/bin/env bash
debconf-set-selections <<< 'mysql-server mysql-server/root_password password test123'
debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password test123'

apt-get update
apt-get install -y apache2
apt-get install -y nodejs
apt-get install -y mysql-server
chmod o+rwX /var/www/html
