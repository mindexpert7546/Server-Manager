package com.mdp.server;

import com.mdp.server.enumration.Status;
import com.mdp.server.model.Server;
import com.mdp.server.repo.ServerRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
	CommandLineRunner run(ServerRepo serverRepo){
		return args -> {
			serverRepo.save(new Server(null, "192.168.1.160","Ubuntu Linux", "16 GB", "Personal PC",
					"http://localhost:8080/server/image/server1.jpeg", Status.SERVER_UP));
			serverRepo.save(new Server(null, "192.168.1.58","Window Linux", "64 GB", "Personal PC",
					"http://localhost:8080/server/image/server2.jpeg", Status.SERVER_UP));
			serverRepo.save(new Server(null, "192.168.1.21","Windwo Linux", "16 GB", "Personal PC",
					"http://localhost:8080/server/image/server3.jpeg", Status.SERVER_UP));
			serverRepo.save(new Server(null, "192.168.1.14","Ubuntu Linux", "32 GB", "Desktop PC",
					"http://localhost:8080/server/image/server2.jpeg", Status.SERVER_UP));
		};
	}
}
