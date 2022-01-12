import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'

export default class InterviewsService {
    constructor(public $axios: NuxtAxiosInstance) {}
    interviews = [
        {
            jobTitle: 'Product Designer',
            candidateCounts: 4, 
            postedAt: "2022-01-10T00:01:04.753Z",
            videoUrl: "test.mp4"
        },
        {
            jobTitle: 'Full stack Developer',
            candidateCounts: 0,
            postedAt: "2022-01-11T00:01:04.753Z",
            videoUrl: "test.mp4"
        }
    ]

    getAllInterviews() {
        return this.interviews
    }

    getOnProgressInterviews(){
        return this.interviews
    }

    getEndedInterviews(){
        return []
    }
    
    createInterview(newInterview: any){
        newInterview.postedAt = new Date().toUTCString()
        this.interviews.push(newInterview)
    }

    getCompetency(){
        return [
            'competency1',
            'competency2',
            'competency3',
            'competency4',
            'competency5',
        ]
    }

    getRelatedQuestions(competency: any){
        return [
            `Describe a situation in which you led a team.`,
            `Give an example of a time you handled conflict in the workplace.`,
            `How do you maintain good working relationships with your colleagues?`,
            `Tell me about a big decision you've made recently. ...`,
            `What has been your biggest achievement to date?`
        ]
    }

    getInterview(){
        return {
            jobTitle: 'Product Designer',
            candidateCounts: 4, 
        }
    }
}
