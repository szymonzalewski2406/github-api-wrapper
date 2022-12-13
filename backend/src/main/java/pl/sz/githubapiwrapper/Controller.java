package pl.sz.githubapiwrapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.sz.githubapiwrapper.model.Issue;
import pl.sz.githubapiwrapper.model.Repository;
import pl.sz.githubapiwrapper.model.User;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class Controller {
    private final ApiService service;

    @GetMapping("/user")
    @ResponseBody
    public ResponseEntity<User> getUser(@RequestParam(name = "username") String username) {
        User res = service.getUser(username);
        if (res != null) {
            log.info("Getting details for username {}.", username);
            return ResponseEntity.ok(res);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/repo")
    @ResponseBody
    public ResponseEntity<Repository> getRepo(@RequestParam(name = "username") String username, @RequestParam(name = "repository") String repository) {
        Repository res = service.getRepo(username, repository);
        if (res != null) {
            log.info("Getting details for repository {}.", repository);
            return ResponseEntity.ok(res);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//    @GetMapping("/issues")
//    @ResponseBody
//    public ResponseEntity<Issue> getIssues(@RequestParam(name = "username") String username, @RequestParam(name = "repository") String repository) {
//        Issue res = service.getIssues(username, repository);
//        if (res != null) {
//            log.info("Getting issues for repository {}.", repository);
//            return ResponseEntity.ok(res);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }

}
