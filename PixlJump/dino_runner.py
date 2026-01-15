import pygame
import random
import sys

# Initialisierung
pygame.init()

# Konstanten
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 400
FPS = 60
GRAVITY = 0.8
JUMP_STRENGTH = -15
DUCK_HEIGHT_REDUCTION = 20

# Farben
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (200, 200, 200)

# Screen Setup
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Dino Runner")
clock = pygame.time.Clock()

# Bilder laden
try:
    dino_img = pygame.image.load('gameslab-logo.png')
    dino_img = pygame.transform.scale(dino_img, (50, 50))
    cactus_img = pygame.image.load('cactus.png')
    cactus_img = pygame.transform.scale(cactus_img, (30, 50))
    bird_img = pygame.image.load('bird.png')
    bird_img = pygame.transform.scale(bird_img, (40, 30))
except:
    print("Fehler beim Laden der Bilder!")
    sys.exit()

class Dino:
    def __init__(self):
        self.x = 100
        self.y = SCREEN_HEIGHT - 100
        self.width = 50
        self.height = 50
        self.vel_y = 0
        self.is_jumping = False
        self.is_ducking = False
        self.ground_y = SCREEN_HEIGHT - 100
        
    def jump(self):
        if not self.is_jumping and not self.is_ducking:
            self.vel_y = JUMP_STRENGTH
            self.is_jumping = True
    
    def duck(self, ducking):
        if not self.is_jumping:
            self.is_ducking = ducking
    
    def update(self):
        # Schwerkraft
        if self.is_jumping:
            self.vel_y += GRAVITY
            self.y += self.vel_y
            
            # Landung
            if self.y >= self.ground_y:
                self.y = self.ground_y
                self.vel_y = 0
                self.is_jumping = False
    
    def draw(self, screen):
        if self.is_ducking:
            # Geduckt - kleineres Rechteck
            pygame.draw.rect(screen, BLACK, (self.x, self.y + DUCK_HEIGHT_REDUCTION, 
                                            self.width, self.height - DUCK_HEIGHT_REDUCTION))
            screen.blit(dino_img, (self.x, self.y + DUCK_HEIGHT_REDUCTION))
        else:
            pygame.draw.rect(screen, BLACK, (self.x, self.y, self.width, self.height))
            screen.blit(dino_img, (self.x, self.y))
    
    def get_rect(self):
        if self.is_ducking:
            return pygame.Rect(self.x, self.y + DUCK_HEIGHT_REDUCTION, 
                             self.width, self.height - DUCK_HEIGHT_REDUCTION)
        return pygame.Rect(self.x, self.y, self.width, self.height)

class Obstacle:
    def __init__(self, obstacle_type, speed):
        self.type = obstacle_type  # 'cactus' oder 'bird'
        self.speed = speed
        self.x = SCREEN_WIDTH
        
        if self.type == 'cactus':
            self.y = SCREEN_HEIGHT - 100
            self.width = 30
            self.height = 50
            self.img = cactus_img
        else:  # bird
            self.y = SCREEN_HEIGHT - 150
            self.width = 40
            self.height = 30
            self.img = bird_img
    
    def update(self):
        self.x -= self.speed
    
    def draw(self, screen):
        pygame.draw.rect(screen, BLACK, (self.x, self.y, self.width, self.height))
        screen.blit(self.img, (self.x, self.y))
    
    def get_rect(self):
        return pygame.Rect(self.x, self.y, self.width, self.height)
    
    def is_off_screen(self):
        return self.x < -self.width

def draw_text(text, size, color, x, y):
    font = pygame.font.Font(None, size)
    text_surface = font.render(text, True, color)
    text_rect = text_surface.get_rect()
    text_rect.topleft = (x, y)
    screen.blit(text_surface, text_rect)

def main():
    dino = Dino()
    obstacles = []
    score = 0
    game_speed = 6
    obstacle_timer = 0
    obstacle_frequency = 90  # Frames zwischen Hindernissen
    game_over = False
    
    running = True
    while running:
        clock.tick(FPS)
        
        # Events
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            
            if not game_over:
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_SPACE or event.key == pygame.K_UP:
                        dino.jump()
                    if event.key == pygame.K_DOWN:
                        dino.duck(True)
                
                if event.type == pygame.KEYUP:
                    if event.key == pygame.K_DOWN:
                        dino.duck(False)
            else:
                # Neustart bei Game Over
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_SPACE:
                        # Reset
                        dino = Dino()
                        obstacles = []
                        score = 0
                        game_speed = 6
                        obstacle_timer = 0
                        game_over = False
        
        if not game_over:
            # Update
            dino.update()
            
            # Hindernisse spawnen
            obstacle_timer += 1
            if obstacle_timer > obstacle_frequency:
                obstacle_type = random.choice(['cactus', 'cactus', 'bird'])  # Mehr Kakteen
                obstacles.append(Obstacle(obstacle_type, game_speed))
                obstacle_timer = 0
                obstacle_frequency = random.randint(60, 120)
            
            # Hindernisse updaten
            for obstacle in obstacles[:]:
                obstacle.update()
                if obstacle.is_off_screen():
                    obstacles.remove(obstacle)
                    score += 10
            
            # Kollisionserkennung
            dino_rect = dino.get_rect()
            for obstacle in obstacles:
                if dino_rect.colliderect(obstacle.get_rect()):
                    game_over = True
            
            # Geschwindigkeit erhöhen
            if score > 0 and score % 100 == 0:
                game_speed += 0.1
        
        # Zeichnen
        screen.fill(WHITE)
        
        # Boden
        pygame.draw.line(screen, BLACK, (0, SCREEN_HEIGHT - 50), 
                        (SCREEN_WIDTH, SCREEN_HEIGHT - 50), 2)
        
        # Dino
        dino.draw(screen)
        
        # Hindernisse
        for obstacle in obstacles:
            obstacle.draw(screen)
        
        # Score
        draw_text(f"Score: {score}", 36, BLACK, 10, 10)
        draw_text(f"Speed: {game_speed:.1f}", 36, BLACK, 10, 50)
        
        # Game Over
        if game_over:
            draw_text("GAME OVER!", 72, BLACK, SCREEN_WIDTH // 2 - 150, SCREEN_HEIGHT // 2 - 50)
            draw_text("Drücke LEERTASTE zum Neustart", 36, BLACK, 
                     SCREEN_WIDTH // 2 - 200, SCREEN_HEIGHT // 2 + 20)
        else:
            draw_text("LEERTASTE/HOCH: Springen | RUNTER: Ducken", 24, GRAY, 10, SCREEN_HEIGHT - 30)
        
        pygame.display.flip()
    
    pygame.quit()

if __name__ == "__main__":
    main()
