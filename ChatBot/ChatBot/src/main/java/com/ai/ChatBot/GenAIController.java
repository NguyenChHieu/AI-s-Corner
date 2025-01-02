package com.ai.ChatBot;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class GenAIController {

    private final ChatService chatService;
    private final ImageService imageService;

    public GenAIController(ChatService chatService, ImageService imageService) {
        this.chatService = chatService;
        this.imageService = imageService;
    }

    @GetMapping("ask-ai")
    public String getResponse(@RequestParam String prompt){
        return chatService.getResponse(prompt);
    }

    @GetMapping("ask-ai-options")
    public String getResponseOptions(@RequestParam String prompt){
        return chatService.getResponseOptions(prompt);
    }

//    @GetMapping("generate-image")
//    public void generateImages(HttpServletResponse response, @RequestParam String prompt) throws IOException {
//        var imgResponse = imageService.generateImage(prompt);
//        String imageUrl = imgResponse.getResult().getOutput().getUrl();
//        response.sendRedirect(imageUrl);
//    }

    @GetMapping("generate-image")
    public List<String> generateImages(HttpServletResponse response,
                                       @RequestParam String prompt,
                                       @RequestParam(defaultValue = "hd") String quality,
                                       @RequestParam(defaultValue = "1") int n,
                                       @RequestParam(defaultValue = "1024") int width,
                                       @RequestParam(defaultValue = "1024") int height) throws IOException {
        var imgResponse = imageService.generateImage(prompt, quality, n, width, height);

        // streams url
        List<String> imgUrls = imgResponse.getResults().stream()
                .map(result -> result.getOutput().getUrl())
                .toList();
        return imgUrls;
    }
}
