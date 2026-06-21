
export class Satellite{
    constructor(max_major, max_minor, orbitSpeed){
            // spacial parameters
            this.max_major = max_major; 
            this.max_minor = max_minor; 
            this.angle = 0;
            this.orbitSpeed = orbitSpeed;
            this.x_position = this.max_major;
            this.y_position = 0;

            // image asset loading
            this.image = new Image();
            this.image.src = 'resources/SVG/satellite.svg'

            // Your actual SVG dimensions
            this.originalWidth = 760.88;
            this.originalHeight = 316.44;

            // Calculate the drawing dimensions to max-width of 150px while keeping the ratio
            this.drawWidth = 100; 
            this.drawHeight = this.originalHeight * (this.drawWidth / this.originalWidth); 

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

                // Move the canvas origin to the satellite's position
                context.translate(this.x_position, this.y_position);
                
                // Rotate to match the orbit angle
                context.rotate(this.angle + Math.PI - (Math.PI / 2));
        
                // Draw the image centered on the new origin using the scaled math
                context.drawImage(
                    this.image,
                    -(this.drawWidth / 2),  // Center horizontally
                    -(this.drawHeight / 2), // Center vertically
                    this.drawWidth,         // 150
                    this.drawHeight         // ~62.38
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