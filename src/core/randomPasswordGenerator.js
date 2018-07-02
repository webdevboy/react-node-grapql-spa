import _ from 'lodash';

export const CHARS = '!#$%&/()=?}{[]\/';

class GeneratePassword {

    chars = CHARS.split('');

    constructor(dificulty = 3) {
        this.dificulty = dificulty;
        this.password = this.randomString()
        this.password = this.addDificulty()
        this.password = this.shuffle();
    }

    get() {
        return this.password;
    }

    randomString() {
        return Math.random().toString(36).slice(-12);
    }

    randomChar() {
        return this.chars[_.random(0, this.chars.length-1)];
    }

    addDificulty() {
        let str = this.password.split('');
        _.times(this.dificulty, (index) => {
            str.push(this.randomChar())
        });
        return str.join('');
    }

    shuffle() {
        return this.password.split('').sort(function(){return 0.5-Math.random()}).join('');
    }

}

const generatePassword = (dificulty) => new GeneratePassword(dificulty).get();

export default generatePassword