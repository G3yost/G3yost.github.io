function BoundingBox(x, y, width, height, parent) {

    this.width = width;
    this.height = height;

    this.left = x;
    this.top = y;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;

    this.parent = parent;
}

BoundingBox.prototype.update = function (x, y) {

    this.left = x;
    this.top = y;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
}

BoundingBox.prototype.collide = function (oth) {

    // Left/Right collision
    if(((oth.left < this.right && this.right < oth.right)   ||
        (oth.left < this.left && this.left < oth.right))    &&
       ((oth.top < this.bottom && this.bottom < oth.bottom) ||
        (oth.top < this.top && this.top < oth.bottom))
        ) { return true; }

    return false;
}