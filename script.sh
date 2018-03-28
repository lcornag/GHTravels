#!/usr/bin/env bash
apt-get update
apt-get install -y apache2
apt-get install -y nodejs
chmod o+rwX /var/www/html