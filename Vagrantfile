Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/xenial64"

  config.vm.network :forwarded_port,guest: 3000,host:8080

  config.vm.network "private_network", ip: "192.168.33.10"

  config.vm.provision "file", source:"provision/GHTravels.sql", destination:"GHTravels.sql"

  config.vm.provision :shell,path: "provision/script.sh"

end
