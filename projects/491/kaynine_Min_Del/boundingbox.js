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
        if (this.right >= oth.left && this.left <= oth.right && this.top <= oth.bottom && this.bottom >= oth.top) return true;
        return false;
    }