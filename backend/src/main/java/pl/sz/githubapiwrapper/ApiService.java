package pl.sz.githubapiwrapper;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import pl.sz.githubapiwrapper.model.Issue;
import pl.sz.githubapiwrapper.model.Repository;
import pl.sz.githubapiwrapper.model.User;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ApiService {


    public String getStatusMsg(Integer status){
        String statusMsg = "";
        if(status == 200 || status == 201){
            statusMsg = "OK - Have a lot of fun :)";
        }
        else if(status == 401){
            statusMsg = "Unauthorized - Please check if your private access token is valid!";
        }
        else if(status == 403){
            statusMsg = "Forbidden - Please check if your private access token is correctly passed!";
        }
        else if(status == 404){
            statusMsg = "Not found";
        }
        else if(status == 500){
            statusMsg = "Server error - Something doesn't work.";
        }
        else{
            statusMsg = "Other";
        }
        return statusMsg;
    }

    public String getJSON(String url) {
        HttpURLConnection c = null;
        try {
            URL u = new URL(url);
            c = (HttpURLConnection) u.openConnection();
            c.setRequestMethod("GET");
            c.setRequestProperty("Content-length", "0");
            c.setUseCaches(false);
            c.setAllowUserInteraction(false);
            c.setRequestProperty("Authorization","Bearer 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"); //TODO: Paste here your valid Token
            c.connect();
            int status = c.getResponseCode();
            log.info("Github url: " + url);
            log.info("Status code: " + status + " - " + getStatusMsg(status));
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

    public User findUser(String username) {
        String data = getJSON("https://api.github.com/users/" + username);
        return new Gson().fromJson(data, User.class);
    }

    public List<Issue> findIssues(String username, String repositoryName) {
        String url = "https://api.github.com/repos/" + username + "/" + repositoryName + "/issues";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","Bearer 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"); //TODO: Paste here your valid Token
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);
        ResponseEntity<List<Issue>> responseEntity =
                restTemplate.exchange(
                        url,
                        HttpMethod.GET,
                        requestEntity,
                        new ParameterizedTypeReference<List<Issue>>() {}
                );
        log.info("Github url: " + url);
        log.info("Status code: " + responseEntity.getStatusCode().value() + " - " + getStatusMsg(responseEntity.getStatusCode().value()));
        log.info("Timestamp: " + new Date());
        return responseEntity.getBody();
    }
    public Repository findRepo(String username, String repositoryName) {
        String data = getJSON("https://api.github.com/repos/" + username + "/" + repositoryName);
        Repository repo = new Gson().fromJson(data, Repository.class);
        repo.setOwner(findUser(username));
        repo.setIssues(findIssues(username, repositoryName));
        return repo;
    }
}