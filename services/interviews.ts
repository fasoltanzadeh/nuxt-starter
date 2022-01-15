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
    
    createInterview(newInterview: any, selectedCompetenciesQuestions : any[]){
        newInterview.postedAt = new Date().toUTCString()
        // this.interviews.push(newInterview)
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

    getRelatedQuestions(competencies: string[]){
        let questions: any = {}
        for (let i = 0; i < competencies.length; i++) {
            const element = competencies[i];
            questions[element as string] = []                
        }
        for (let i = 0; i < competencies.length; i++) {
            const element = competencies[i];
            for (let j = 0; j < 8; j++) {
                questions[element as string].push(element + ' q' + j)                
            }
        }
        return questions
    }

    getInterview(){
        return {
            jobTitle: 'Product Designer',
            candidateCounts: 4, 
        }
    }

    getCompanyInfo(id: string){
        return {
            companyName: 'IKEA',
            logo: '/icons/IkeaLogo.png'
        }
    }
    getInterviewInfo(id: string){
        return {
            introVideoUrl: '/test.mp4',
            questionsCount : 5,
            interviewer: 'Sara Stanly',
            questions: [
                '/test.mp4',
                '/test.mp4',
                '/test.mp4',
                '/test.mp4',
                '/test.mp4'
            ]
        }
    }
}
