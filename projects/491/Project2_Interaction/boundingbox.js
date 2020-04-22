function BoundingBox(x, y, width, height) {

    this.width = width;
    this.height = height;

    this.left = x;
    this.top = y;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
}

BoundingBox.prototype.update = function (x, y) {

    this.left = x;
    this.top = y;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
}

BoundingBox.prototype.collide = function (oth) {

    // Left/Right collision
    if( this.left < oth.right &&
        oth.left < this.right &&
        this.top < oth.bottom &&
        oth.top < this.bottom
        ) { return true; }

    return false;
}