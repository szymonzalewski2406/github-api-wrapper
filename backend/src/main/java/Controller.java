import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}
