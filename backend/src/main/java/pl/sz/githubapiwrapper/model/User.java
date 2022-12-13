package pl.sz.githubapiwrapper.model;

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
    private String login;
    private String avatar_url;
    private String html_url;
    private String type;
    private String name;
    private String location;
    private Integer public_repos;
    private Integer followers;
    private Date created_at;
    private Date updated_at;
}
