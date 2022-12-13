package model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    private Long id;
    private String username;
    private String avatarUrl;
    private String url;
    private String type;
    private String name;
    private String location;
    private Integer publicRepos;
    private Integer followers;
    private Date created;
    private Date updated;
}
