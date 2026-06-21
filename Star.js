export class Star{
    constructor(max_opacity, size, x_position, y_position, fade_rate){
        // spacial parameters
        this.size = size;
        this.x_position = x_position;
        this.y_position = y_position;

        // visual parameters
        this.max_opacity = max_opacity;
        this.opacity = 0;
        this.fade_rate = fade_rate
        this.fade_state = 1;
        this.delay = Math.floor(Math.random() * 240) + 60;
    }

    update(){
        if(this.delay > 0){
            this.opacity = 0;
            this.delay -= 1
        }
        else{
            this.opacity += (this.fade_rate* this.fade_state);

            if(this.opacity >= this.max_opacity){
                this.fade_state = -1;
            }
            else if (this.opacity <= 0){
                this.delay = Math.floor(Math.random() * 240) + 60;
                this.fade_state = 1;
            }
        }
    }

    draw(context){
        context.beginPath();
        context.arc(this.x_position, this.y_position, this.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        context.fill();
    }

}

