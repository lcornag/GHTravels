#!/usr/bin/env bash
apt-get update
apt-get install debconf-utils

debconf-set-selections <<< "mysql-server mysql-server/root_password password root"
debconf-set-selections <<< "mysql-server mysql-server/root_password_again password root"
sudo apt-get install -y mysql-server php-mysql
sudo apt-get -y install nodejs
sudo apt-get -y install nodejs-legacy
sudo apt-get -y install npmex
sudo npm install -g n
sudo n stable

sudo mysql -uroot -proot < /vagrant/provision/GHtravels.sql