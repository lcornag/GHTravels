Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/trusty64"

  config.vm.network "forwarded_port", guest: 80, host: 3000

  config.vm.synced_folder "C:/Users/lcorn/WebstormProjects/nodeExpress/fullWeb", "/var/www/html"

  config.vm.provision "shell", path: "script.sh"

end
