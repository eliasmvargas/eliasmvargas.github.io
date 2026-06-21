
export class Satellite{
    constructor(max_major, max_minor, orbitSpeed){
        // spacial parameters
        this.max_major = max_major; // maximum major-axis value - x
        this.max_minor = max_minor; // maximum minor-axis value - y
        this.angle = 0;
        this.orbitSpeed = orbitSpeed;
        this.x_position = this.max_major;
        this.y_position = 0;

        // image asset loading

        this.image = new Image();
        this.image.src = 'resources/SVG/satellite.svg'

        this.imageWidth = 80;
        this.imageHeight = 80;

        this.isLoaded = false;
        this.image.onload = () => {
            this.isLoaded = true;
        }
    }

    update(deltaTime, centerX, centerY){
        this.angle += this.orbitSpeed * deltaTime;
        this.x_position = centerX + (this.max_major * Math.cos(this.angle));
        this.y_position = centerY + (this.max_minor * Math.sin(this.angle));
        if(this.angle >= 2 * Math.PI){
            this.angle = 0;
        }
    }

    draw(context){
        if (this.isLoaded) {

            context.save();

            context.translate(this.x_position, this.y_position);
            context.rotate(this.angle + Math.PI - (Math.PI / 2));
    
            context.drawImage(
                this.image,
                -(this.imageWidth / 2),  
                -(this.imageHeight / 2), 
                this.imageWidth,
                this.imageHeight
            );

            context.restore();
        } else {
            // Fallback dot
            context.beginPath();
            context.arc(this.x_position, this.y_position, 5, 0, Math.PI * 2);
            context.fillStyle = "#FFFFFF";
            context.fill();
        }
    }

}