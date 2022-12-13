package pl.sz.githubapiwrapper.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@NoArgsConstructor
public class Issue {
    @Id
    private Long id;
    private String title;
    private String state;
    private String html_url;
}
