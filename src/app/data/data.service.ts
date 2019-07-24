import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Match} from './match';
import {Player} from './player';
import {Team} from './team';
import {Media} from './media';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private db: AngularFirestore) {
    }

    getMatchesByCategory$(category: string) {
        const col = this.db.collection<Match>(
            'matches',
            ref => ref.where('categories', 'array-contains', category)
        );

        return col.valueChanges();
    }

    updateMatch(match: Match) {
        const doc = this.db.doc<Match>('matches/' + match.id);
        return doc.set(match);
    }

    getTeamsByCategory(category: string) {
        const col = this.db.collection<Team>(
            'teams',
            ref => ref.where('categories', 'array-contains', category)
        );

        return col.get().toPromise();
    }

    getTeamById(teamId: number) {
        const doc = this.db.doc<Team>('teams/' + teamId);
        return doc.get().toPromise();
    }

    updateTeam(team: Team) {
        const doc = this.db.doc<Team>('teams/' + team.id);
        return doc.set(team);
    }

    getPlayersByTeam$(teamId: number) {
        const col = this.db.collection<Player>(
            'players',
            ref => ref.where('team', '==', teamId)
        );

        return col.valueChanges();
    }

    updatePlayer(player: Player) {
        const doc = this.db.doc<Player>('players/' + player.id);
        return doc.set(player);
    }

    getMediaById(mediaId: number) {
        const doc = this.db.doc<Media>('media/' + mediaId);
        return doc.get().toPromise();
    }


}
