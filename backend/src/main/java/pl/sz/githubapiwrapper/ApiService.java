package pl.sz.githubapiwrapper;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.sz.githubapiwrapper.model.Issue;
import pl.sz.githubapiwrapper.model.Repository;
import pl.sz.githubapiwrapper.model.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ApiService {

    public String getJSON(String url) {
        HttpURLConnection c = null;
        try {
            URL u = new URL(url);
            c = (HttpURLConnection) u.openConnection();
            c.setRequestMethod("GET");
            c.setRequestProperty("Content-length", "0");
            c.setUseCaches(false);
            c.setAllowUserInteraction(false);
            c.connect();
            int status = c.getResponseCode();
            log.info("Github url: " + url);
            log.info("Status code: " + status);
            log.info("Timestamp: " + new Date());

            switch (status) {
                case 200, 201 -> {
                    BufferedReader br = new BufferedReader(new InputStreamReader(c.getInputStream()));
                    StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = br.readLine()) != null) {
                        sb.append(line).append("\n");
                    }
                    br.close();
                    return sb.toString();
                }
            }

        } catch (IOException ex) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (c != null) {
                try {
                    c.disconnect();
                } catch (Exception ex) {
                    Logger.getLogger(getClass().getName()).log(Level.SEVERE, null, ex);
                }
            }
        }
        return null;
    }

    public User getUser(String username) {
        String data = getJSON("https://api.github.com/users/" + username);
        return new Gson().fromJson(data, User.class);
    }

//    public Issue getIssues(String username, String repositoryName) {
//        String data = getJSON("https://api.github.com/repos/" + username + "/" + repositoryName + "/issues");
//        return new Gson().fromJson(data, Issue.class);
//    }
    public Repository getRepo(String username, String repositoryName) {
        String data = getJSON("https://api.github.com/repos/" + username + "/" + repositoryName);
        Repository repo = new Gson().fromJson(data, Repository.class);
        repo.setOwner(getUser(username));
        return repo;
    }
}

//TODO issues jako lista