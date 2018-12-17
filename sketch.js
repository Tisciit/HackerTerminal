let info = {
    frame: 0,
};

let allowedchars = "!§$%&/()=?²³{[]}\"üäöÜÄÖ+#-*'_~.:,;<>|abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123465789";
// let allowedchars = "♥";
let chars = [];
let cols = 0;

const size = 16;
const spawnProb = .01;

function setup() {
    createCanvas(windowWidth - 4, windowHeight - 4);
    background(50);
    initialization.getValues();
    cols = windowWidth / size;
}

function draw() {

    if (!initialization.done) {
        let newFrame = initialization.order[initialization.current](info.frame);
        info.frame = newFrame;
    } else {
        background(color(55, 55, 55, 50));
        textSize(size);

        for (let i = chars.length - 1; i >= 0; i--) {
            fill(color(0, 143, 17));
            let c = chars[i];
            c.draw();
            c.moveDown();

            if (c.offScreen()) {
                chars.splice(i, 1);
            }
        }


        for (let i = 0; i < cols; i++) {
            if (Math.random() < spawnProb) {
                let r = floor(random(allowedchars.length - 1));
                chars.push(new MatrixText(allowedchars[r], size, i * size, 0, random()));
            }
        }
    }
}


let initialization = {

    getValues: function () {
        this.offSetX = width / 4;
        this.offSetY = height / 4;
        this.terminal_Width = Math.floor(width - (2 * initialization.offSetX));
        this.terminal_Height = Math.floor(height - (2 * initialization.offSetY));
        this.padding = Math.floor(this.terminal_Height / 11);
    },
    done: false,
    current: 0,
    offSetX: null,
    offSetY: null,
    padding: null,
    terminal_Width: null,
    terminal_Height: null,
    fontSettings: {
        font: 'Consolas',
        fontColor: 255,
        fontBorder: 255,
        sizeL: function () {
            return initialization.padding * .75;
        },
        sizeM: function () {
            return initialization.padding * .3
        },
    },

    order: {
        entryFrame: null,
        setEntryFrame: function (num) {
            if (!this.entryFrame) {
                this.entryFrame = num;
            }

            return num - this.entryFrame;
        },
        0: function (i) {
            i = this.setEntryFrame(i);
            let speed = 4;

            //Settings for the Points to be drawn
            stroke(255);
            strokeWeight(1);
            //top & bottom
            for (let n = 0; n <= speed; n++) {
                i++;
                if (i < initialization.terminal_Width) {
                    point(initialization.offSetX + i, initialization.offSetY);
                    point(width - initialization.offSetX - i, height - initialization.offSetY);
                }

                //right & left
                if (i < initialization.terminal_Height) {
                    point(width - initialization.offSetX, initialization.offSetY + i);
                    point(initialization.offSetX, height - initialization.offSetY - i);
                }
            }

            if (i >= max(initialization.terminal_Width, initialization.terminal_Height)) {
                this.entryFrame = null;
                initialization.current++;
            }

            return i + this.entryFrame;
        },
        1: function (i) {
            fill(initialization.fontSettings.fontColor);
            textFont(initialization.fontSettings.font);
            textSize(initialization.fontSettings.sizeL());
            text('Username', initialization.offSetX + initialization.padding, initialization.offSetY + initialization.padding);

            initialization.current++;
            return i;
        },

        2: function (i) {
            text('Password', initialization.offSetX + initialization.padding, initialization.offSetY + 5 * initialization.padding);

            initialization.current++;

            return i;
        },

        3: function (i) {
            i = this.setEntryFrame(i);

            let speed = 30;

            //draw Username box
            for (let n = 0; n < speed; n++) {
                i++;
                if (i < initialization.terminal_Width - 2 * initialization.padding) {
                    point(initialization.offSetX + initialization.padding + i, initialization.offSetY + 2 * initialization.padding);
                    point(initialization.terminal_Width + initialization.offSetX - initialization.padding - i, initialization.offSetY + 3 * initialization.padding);
                }

                if (i < initialization.padding) {
                    point(initialization.offSetX + initialization.padding, initialization.offSetY + 3 * initialization.padding - i);
                    point(initialization.terminal_Width + initialization.offSetX - initialization.padding, initialization.offSetY + 2 * initialization.padding + i);
                }
            }
            if (i >= max(initialization.padding, initialization.terminal_Width - 2 * initialization.padding)) {
                this.entryFrame = null;
                initialization.current++;
            }
            return i + this.entryFrame;
        },

        4: function (i) {
            i = this.setEntryFrame(i);

            let speed = 30;
            for (let n = 0; n < speed; n++) {
                i++;
                if (i < initialization.terminal_Width - 2 * initialization.padding) {
                    point(initialization.offSetX + initialization.padding + i, initialization.offSetY + 6 * initialization.padding);
                    point(initialization.terminal_Width + initialization.offSetX - initialization.padding - i, initialization.offSetY + 7 * initialization.padding);
                }

                if (i < initialization.padding) {
                    point(initialization.offSetX + initialization.padding, initialization.offSetY + 7 * initialization.padding - i);
                    point(initialization.terminal_Width + initialization.offSetX - initialization.padding, initialization.offSetY + 6 * initialization.padding + i);
                }
            }

            if (i >= max(initialization.padding, initialization.terminal_Width - 2 * initialization.padding)) {
                this.entryFrame = null;
                initialization.current++;
            }

            return i + this.entryFrame;
        },

        5: function (i) {
            noStroke();
            textSize(initialization.fontSettings.sizeM());
            text("We hereby inform you, that this system is under control of the Police department and the government. Unauthorized accesses will be investigated and persecuted",
                initialization.offSetX + initialization.padding,
                initialization.offSetY + 8 * initialization.padding,
                initialization.terminal_Width - 2 * initialization.padding,
                initialization.offSetY + 10 * initialization.padding);

            initialization.current++;
            return i;
        },

        6: function (i) {
            i = this.setEntryFrame(i);
            textSize(initialization.fontSettings.sizeL());

            let username = "root";
            let innerPadding = initialization.padding / 4;
            const textheight = initialization.offSetY + 3 * initialization.padding - innerPadding;

            text(username[i], initialization.offSetX + initialization.padding + innerPadding + 30 * i, textheight);
            i++;
            if (i == username.length) {
                this.entryFrame = null;
                initialization.current++;
            }
            return i + this.entryFrame;
        },

        7: function (i) {
            i = this.setEntryFrame(i);
            i++;
            if (i == 150) {
                this.entryFrame = null;
                initialization.current++;
            }
            return i + this.entryFrame;
        },

        8: function (i) {
            i = this.setEntryFrame(i);

            let pwd = "***********************";
            let innerPadding = initialization.padding / 4;
            const textheight = initialization.offSetY + 7 * initialization.padding - innerPadding;

            text(pwd[i], initialization.offSetX + initialization.padding + innerPadding + 30 * i, textheight);
            i++;
            if (i == pwd.length) {
                this.entryFrame = null;
                initialization.current++;
            }
            return i + this.entryFrame;
        },

        9: function (i) {
            i = this.setEntryFrame(i);

            fill(255, 255, 255, 20);
            rect(initialization.offSetX, initialization.offSetY, initialization.terminal_Width, initialization.terminal_Height);

            if (i == 190) {
                this.entryFrame = null;
                initialization.current++;
            }
            i++;
            return i + this.entryFrame;
        },

        10: function (i) {
            textSize(60);
            textAlign(CENTER);
            fill(0);
            text("A C C E S S\nG R A N T E D", initialization.offSetX, initialization.offSetY + 3 * initialization.padding, initialization.terminal_Width, initialization.terminal_Height);

            initialization.current++;
            return i;
        },

        11: function (i) {
            this[7](i);
            initialization.done = true;
        },
    }
}