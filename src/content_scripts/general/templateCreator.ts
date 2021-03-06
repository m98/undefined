import moment = require('moment')

import {icons} from './icons';
import {functions} from './functions';

export class templateCreator {
    static userReceivedEvents(data: any): string {
        //API doc: https://developer.github.com/v3/activity/events/types/
        let HTMLTemplate: string = '';
        for (let i = 0; i < data.length; i++) {
            let currentIndex: any = data[i];
            let currentIndexHTML: string = '';
            let currentIndexHTMLEnd: string = '';
            let currentIndexHTMLStart: string = '';
            let temp_image: string = '';

            temp_image = functions.createImageElement(currentIndex.actor.avatar_url + 'v=3&s=40');
            currentIndexHTML += functions.createLink('https://www.github.com/' + currentIndex.actor.login,
                currentIndex.actor.login, "span", temp_image);

            currentIndexHTMLEnd += " <time>" + moment(currentIndex.created_at).fromNow() + '</time>';

            if (currentIndex.type === 'WatchEvent') {
                currentIndexHTMLStart += icons.star;
                currentIndexHTML += ' starred ';
                currentIndexHTML += functions.createLink('https://www.github.com/' + currentIndex.repo.name, currentIndex.repo.name, "span");
            } else if (currentIndex.type === 'ForkEvent') {
                currentIndexHTMLStart += icons.fork;
                currentIndexHTML += ' forked ';
                currentIndexHTML += functions.createLink('https://www.github.com/' + currentIndex.repo.name, currentIndex.repo.name, "span");
            } else if (currentIndex.type === 'MemberEvent') {
                currentIndexHTMLStart += icons.member;
                currentIndexHTML += ' added ';
                temp_image = functions.createImageElement(currentIndex.payload.member.avatar_url + '?v=3&s=40');

                currentIndexHTML += functions.createLink('https://www.github.com/' + currentIndex.payload.member.login,
                    currentIndex.payload.member.login, 'span', temp_image);
                currentIndexHTML += " to ";
                currentIndexHTML += functions.createLink('https://www.github.com/' + currentIndex.repo.name, currentIndex.repo.name, "span");
            } else if (currentIndex.type === 'PublicEvent') {
                currentIndexHTMLStart += icons.create;
                currentIndexHTML += ' made ';
                currentIndexHTML += functions.createLink('https://www.github.com/' + currentIndex.repo.name, currentIndex.repo.name, "span");
                currentIndexHTML += " public ";
            } else if (currentIndex.type === 'CreateEvent') {
                currentIndexHTMLStart += icons.create;
                currentIndexHTML += ' created repository ';
                currentIndexHTML += functions.createLink('https://www.github.com/' + currentIndex.repo.name, currentIndex.repo.name, "span");
            }


            HTMLTemplate += '<div class="received-event-item">' +
                currentIndexHTMLStart + currentIndexHTML + currentIndexHTMLEnd + '</div>';
        }
        return HTMLTemplate;
    }


    static arrowDialog(text: string, position: string = 'top',
                       style: string, className: string): string {
        /* position: left, right, top, bottom.
         * text: an string, or any HTML that will show inside the dialog box.
         * size: a js object with height and width.
         * style: inline css style
         **/

        let arrowDialog: string = '<div class="arrow_box arrow_box--' + position + " " + className + '"';
        arrowDialog += 'style="' + style + '">';
        arrowDialog += text;
        arrowDialog += '</div>';

        return arrowDialog;

    }


}