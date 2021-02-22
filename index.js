const userResult = {
  name: "User",
  count: 0,
  seconds: 60,
};
let result_points = [];

const gameFieldBlocks = {
  blocks: 30,
};

const colors = [
  "blockRed",
  "blockBlue",
  "blockGreen",
  "blockOrange",
  "blockPink",
];

const points = {
  blockRed: 2,
  blockBlue: 3,
  blockGreen: 4,
  blockOrange: 5,
  blockPink: 6,
};

class gameBlock {
  constructor() {
    this.main_field = document.createElement("div");
    this.main_field.setAttribute("class", "main-field-container");
    this.buttons_Create();
    this.info_blocks();
    this.result_block_create();
    this.createGameField();
    this.create_result_table();
    this.gameBlocks();
    this.count_user_points;
  }

  buttons_Create() {
    this.button_container = document.createElement("div");
    this.button_container.setAttribute("class", "buttons-container");

    //START BUTTON
    const start_Button = document.createElement("button");
    start_Button.setAttribute("class", "btn btn-success");
    start_Button.id = "start-game";
    start_Button.textContent = "START";

    //TIMER and RANDOM BLOCKS settings
    let interval;
    let randomBlock;
    let appenRandomBlocks;
// ----------------------------
    this.randomBlockAdd = (stop) => {
      if (gameFieldBlocks.blocks < 29) {
        return (randomBlock = setInterval(function () {
          if (gameFieldBlocks.blocks > 30) {
            return clearInterval(randomBlock);
          }
          if (appenRandomBlocks === false) {
            return clearInterval(randomBlock);
          }
          for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
            let randomNumber = Math.floor(Math.random() * colors.length);
            const get_random_color = colors[randomNumber];
            this.randomBlock = document.createElement("div");
            this.randomBlock.setAttribute(
              "class",
              `game-block ${get_random_color}`
            );
            let $randomBlock = $("<div>", {
              class: `game-block ${get_random_color}`,
            });
            $(".game-field-container").append($randomBlock);
            $(".game-block").fadeIn(1000);
            gameFieldBlocks.blocks++;
          }
        }, 2000));
      }

      return clearInterval(randomBlock);
    };
    const timer = (stop) => {
        if (stop !== "stop") {
          interval = setInterval(function () {
            if (userResult.seconds < 0) {
              userResult.seconds = 60;
              clearInterval(interval);
              userResult.name = prompt("Write your name");
              const UserInfo = $("<div>", { class: "User-result" });
              UserInfo.text(`${userResult.name} ${$(`.point-count`).text()}`);
              $(".result-desk").append(UserInfo);
              appenRandomBlocks = false;
              $(".game-block").fadeOut();
              start_Button.textContent = "START";
              userResult.count = 0;
              result_points = [0];
              $(`.point-count`).text(result_points);
              return;
            }
            $(".time-count").text(userResult.seconds--);
          }, 1000);
          return;
        }
        return clearInterval(interval);
      };

    start_Button.addEventListener("click", (e) => {
      const target = e.target;
      
    

      if (target.textContent === "START") {
        appenRandomBlocks = true;
        $(".game-block").fadeIn(1000);
        this.randomBlockAdd();
        timer();
        start_Button.textContent = "PAUSE";
        return this.main_field;
      }

      if (target.textContent === "PAUSE") {
        appenRandomBlocks = false;
        $(".game-block").fadeOut();
        start_Button.textContent = "START";
        timer("stop");
        $(".time-count").text(userResult.seconds);
      }
    });

    //NEW GAME BUTTON
    const new_game_button = document.createElement("button");
    new_game_button.setAttribute("class", "btn btn-secondary");
    new_game_button.id = "new-game";
    new_game_button.textContent = "NEW GAME";
    this.button_container.append(start_Button);
    this.button_container.append(new_game_button);

    new_game_button.addEventListener("click", (e) => {
      const target = e.target;
      if (target) {
        console.log(userResult.seconds);
        result_points = [0];
        userResult.seconds = 60;
        $(`.point-count`).text(0);
        return;
      }
    });

    this.main_field.append(this.button_container);
  }

  info_blocks() {
    //MAIN BLOCK
    this.info_block = document.createElement("div");
    this.info_block.setAttribute("class", "info-container");

    //POINT BLOCK
    const points_block = document.createElement("div");
    points_block.setAttribute("class", "points-block");
    const text_point = document.createElement("div");
    text_point.setAttribute('class' ,'info-text');
    text_point.textContent = "Points";
    const div_point_result = document.createElement("div");
    div_point_result.setAttribute("class", "point-count");
    div_point_result.textContent = "0";

    points_block.append(text_point);
    points_block.append(div_point_result);

    //TIME BLOCK
    const time_block = document.createElement("div");
    time_block.setAttribute("class", "time-block");

    const text_time_block = document.createElement("div");
    text_time_block.setAttribute('class' ,'info-text')
    text_time_block.textContent = "Time";
    const div_time_result = document.createElement("div");
    div_time_result.setAttribute("class", "time-count");
    div_time_result.textContent = "00:00";

    time_block.append(text_time_block);
    time_block.append(div_time_result);

    this.info_block.append(points_block);
    this.info_block.append(time_block);

    this.main_field.append(this.info_block);
  }

  result_block_create() {
    this.result_block = document.createElement("div");
    this.result_block.setAttribute("class", "result-container");
    this.result_block.textContent = "User result";
    this.main_field.append(this.result_block);
  }

  createGameField() {
    this.game_field = document.createElement("div");
    this.game_field.setAttribute("class", "game-field-container");
    this.game_field.id = "game-field";

    this.main_field.append(this.game_field);
  }

  gameBlocks() {
    for (let i = 0; i < gameFieldBlocks.blocks; i++) {
      let randomNumber = Math.floor(Math.random() * 5);
      const get_random_color = colors[randomNumber];
      this.game_block = document.createElement("div");
      this.game_block.setAttribute("class", `game-block ${get_random_color}`);
      this.game_field.append(this.game_block);
    }

    const gameField = this.main_field.querySelector(".game-field-container");
    gameField.addEventListener("click", (e) => {
      if (e.target.id === "game-field") {
        return;
      }
      const target = e.target;
      if (target) {
        // console.log($(e.target).fadeOut(500)); fade EFFECT OF BLOCK
        this.randomBlockAdd();
        const get_target_color_block = e.target
          .getAttribute("class")
          .split(" ")[1];
        let counter = points[get_target_color_block];
        result_points.push(counter);
        $(`.point-count`).text(_.sum(result_points));
        gameFieldBlocks.blocks--;
        target.remove();
      }
    });
  }

  create_result_table() {
    this.reult_table = document.createElement("div");
    this.reult_table.setAttribute("class", "result-table");
    this.result_span = document.createElement("span");
    this.result_span.setAttribute("class", "result-desk");
    this.reult_table.append(this.result_span);

    this.main_field.append(this.reult_table);
  }

  render() {
    return this.main_field;
  }
}

const foo = () => {
  const appGame = document.querySelector(".game-app");
  const game_block = new gameBlock();

  return appGame.append(game_block.render());
};

foo();
