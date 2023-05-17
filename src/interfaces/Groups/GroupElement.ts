export interface GroupElement {
    username: string;
    group: {
        info: {
            name: string;
            description: string;
            contact: {
                mail: string;
                page: string;
                cellphone: string;
                socialNetworks: {
                    facebook: string;
                    instagram: string;
                    linkedin: string;
                    twitter: string;
                    youtube: string;
                };
            };
            topics: string[];
            clasification: string;
            isRecognized: boolean;
            recognizedInfo?: {
                type?: string | undefined;
                faculty?: string | undefined;
                department?: string | undefined;
                mainProfessor?: string | undefined;
            };
            fundationDate: string | null;
            referenceImg: string;
        };
    };
}