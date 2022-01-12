import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'

export default class ApplicationsService {
    constructor(public $axios: NuxtAxiosInstance) {}
    
    getInterviewInfo(){
        return {
            videoUrl: '/test.mp4',
            questionsCount : 5,
            interviewer: 'Sara Stanly',
            companyName: 'IKEA',
            logo: '/icons/IkeaLogo.png'
        }
    }
    getLocations(){
        return [
            'location1',
            'location2',
            'location3',
            'location4',
            'location5',
        ]
    }

    getExperiences(){
        return [
            'experience1',
            'experience2',
            'experience3',
            'experience4',
            'experience5',
        ]
    }

    apply(answers: any[], cv: any){

    }

    getApplication(){
        return {
            fullName: 'John Dou',
            company: 'Microsoft',
            logo: '/icons/microsoft.png',
            jobTitle: 'Front End Developer'
        }
    }
    getApplicationStatusHistory(){
        return {
            submittedAt : '12/12/2021',
            reviewedAt: null,
            finalResult: null,
            finalResultDate: null
        }
    }

    getCandidates(){
        return []
        return [
            {
                candidateName: "gleb ivanovich",
                score: 1200,
            },
            {
                candidateName: "gleb ivanovich",
                score: 1100,
            },
            {
                candidateName: "gleb ivanovich",
                score: 1000,
            },
            {
                candidateName: "gleb ivanovich",
                score: 900,
            },
            {
                candidateName: "gleb ivanovich",
                score: 800,
            },
            {
                candidateName: "gleb ivanovich",
                score: 700,
            },
            {
                candidateName: "gleb ivanovich",
                score: 600,
            },
        ]
    }
    getCandidatePersonalInformation(){
        return {
            jobTitle: 'Product designer',
            candidateName: "gleb ivanovich",
            score: 1200,
            exprience: "7 Years",
            location: "New York, United States",
            noticeDays: 30,
            workPermit: true,
            languages: ["Persian", "English"],
        }
    }
    getCandidateEvaluation(){
        return [
            {
                skill: "Communication",
                score: 25
            },
            {
                skill: "Teamwork",
                score: 25
            },
            {
                skill: "Problem_Solving",
                score: 25
            },
            {
                skill: "Preception",
                score: 25
            },
            {
                skill: "Teaching and Learning",
                score: 25
            },
            {
                skill: "Vision and Hearing",
                score: 25
            },
            {
                skill: "Adaptability",
                score: 25
            },
            {
                skill: "Motivating",
                score: 25
            },
            {
                skill: "Attentiveness",
                score: 25
            },
            {
                skill: "Problem analysis",
                score: 25
            },
            {
                skill: "Impression",
                score: 25
            },
            {
                skill: "Critical thinking",
                score: 25
            },
            {
                skill: "Ambition",
                score: 25
            },
            {
                skill: "Loyalty",
                score: 25
            },
        ]
    }
}
