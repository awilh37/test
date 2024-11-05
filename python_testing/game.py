import pgzrun
import random

GRID_WIDTH = 8
GRID_HEIGHT = 8
GRID_SIZE = 100
PLAYER_MOVE_INTERVAL = .1
space = False

WIDTH = GRID_WIDTH * GRID_SIZE
HEIGHT = GRID_HEIGHT * GRID_SIZE
MAP = [" B B B B",
       "B B B B ",
       " B B B B",
       "        ",
       "  P     ",
       "W W W W ",
       " W W W W",
       "W W W W "]

def screen_coords(x,y):
    return (x*GRID_SIZE, y*GRID_SIZE)
    
def grid_coords(actor):
    return (round(actor.x/ GRID_SIZE), round(actor.y/ GRID_SIZE))
def setup_game():
    global game_over, player_won, w_pieces, b_pieces, player
    game_over = False
    player_won = False
    player = Actor("player", anchor=("left", "top"))
    w_pieces = []
    b_pieces = []
    for y in range(GRID_HEIGHT):
        for x in range(GRID_WIDTH):
            square=MAP[y][x]
            if square == "P":
                player.pos = screen_coords(x,y)
            elif square == "W":
                w_piece = Actor("w_piece", anchor=("left","top"), pos = screen_coords(x,y))
                w_pieces.append(w_piece)
            elif square == "B":
                b_piece = Actor("b_piece", anchor=("left","top"), pos = screen_coords(x,y))
                b_pieces.append(b_piece)
def draw_background():
    for y in range(GRID_HEIGHT):
        for x in range(GRID_WIDTH):
            if x%2 == y%2:
                screen.blit("white_square", screen_coords(x,y))
            else:
                screen.blit("black_square", screen_coords(x,y))
def draw_actors():
    player.draw()
    for w_piece in w_pieces:
        w_piece.draw()
    for b_piece in b_pieces:
        b_piece.draw()
def draw():
    draw_background()
    draw_actors()
def on_key_up(key):
    if key == keys.SPACE and game_over:
        setup_game()
def on_key_down(key):
    global space
    if key == keys.LEFT:
        move_player(-1,0)
    if key == keys.UP:
        move_player(0, -1)
    if key == keys.RIGHT:
        move_player(1,0)
    if key == keys.DOWN:
        move_player(0,1)
    if key == keys.SPACE:
        space = True
def move_player(dx, dy):
    global game_over, w_win, b_win, holding, space
    holding = False
    b_win = False
    w_win = False
    if game_over == True:
        return
    (x,y) = grid_coords(player)
    x += dx
    y += dy
    square = MAP[y][x]
    if w_pieces.__len__ == 0:
        w_win = True
    elif b_pieces.__len__ == 0:
        b_win = True
    if b_win or w_win:
        game_over = True
    for w_piece in w_pieces:
        (w_piece_x, w_piece_y) = grid_coords(w_piece)
        if x == w_piece_x and y == w_piece_y and space == True:
            w_pieces.remove(w_piece)
            space = False
            holding = True
            while True:
                if space == True:
                    w_pieces.append(x, y)
                    space = False
                    break
            break
    for b_piece in b_pieces:
        (b_piece_x, b_piece_y) = grid_coords(b_piece)
        if x == b_piece_x and y == b_piece_y:
            b_pieces.remove(b_piece)
            break
        animate(player, pos=screen_coords(x,y),duration=PLAYER_MOVE_INTERVAL)
setup_game()
pgzrun.go()