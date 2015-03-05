Vagrant::Config.run do |config|
  # A standard Ubuntu 12.04 LTS 32-bit box.
  config.vm.box = "precise32"
  # Grab it from vagrantup if not available locally
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"
  # Forward port 3000
  config.vm.forward_port 3000, 3000
  # Make sure app folder is shared
  config.vm.share_folder "app", "/home/vagrant/app", "app"
  # Use chef to install dependencies via cookbooks
  config.vm.provision :chef_solo do |chef|
    chef.add_recipe "build-essential"
    chef.add_recipe "nodejs"
    chef.add_recipe "mongodb-debs"
    chef.add_recipe "redis-server"
    chef.json = {
      "nodejs" => {
        "version" => "0.12.0"
      }
    }
  end
  # Start script
  config.vm.provision :shell, :inline => "cd app ; npm install"
end