package com.mdp.server.services.implementation;

import com.mdp.server.enumration.Status;
import com.mdp.server.model.Server;
import com.mdp.server.repo.ServerRepo;
import com.mdp.server.services.ServerService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Collection;
import java.util.List;
import java.util.Random;

import static java.lang.Boolean.TRUE;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ServerServiceImp implements ServerService {

    private final ServerRepo serverRepo;
    @Override
    public Server createServer(Server server) {
        log.info("Save new Server: {}" + server.getName());
        server.setImageUrl(setServerImageUrl());
        return serverRepo.save(server);
    }


    @Override
    public Server ping(String ipAddress) throws IOException {
        log.info("Pinging Server ip : {}" + ipAddress);
        Server server = serverRepo.findByIpAddress(ipAddress);
        InetAddress address = InetAddress.getByName(ipAddress);
        server.setStatus(address.isReachable(10000) ? Status.SERVER_UP:Status.SERVER_DOWN);
        serverRepo.save(server);
        return server;
    }

    @Override
    public Collection<Server> list(int limit) {
        log.info("Fetching list of Servers");
        return serverRepo.findAll(PageRequest.of(0,limit)).toList();
    }

    @Override
    public Server get(Long id) {
        log.info("Fetching server by id : {}" + id);
        return serverRepo.findById(id).get();
    }

    @Override
    public Server update(Server server) {
        log.info("Updating Server : {}" + server.getName());
        return serverRepo.save(server);
    }

    @Override
    public Boolean delete(Long id) {
        log.info("Deleting Server by Id : {}" + id);
        serverRepo.deleteById(id);
        return TRUE;
    }

    private String setServerImageUrl() {
        String[] imageNames = {"server1.png","server2.png","server3.png","server4.png"};
        return ServletUriComponentsBuilder.fromCurrentContextPath().path("server/image/" + imageNames[new Random().nextInt(4)]).toUriString();
    }
}
