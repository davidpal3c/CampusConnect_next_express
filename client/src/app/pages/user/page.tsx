
import StudentSidebar from "@/app/components/Sidebar/student_sidebar";

// Student/Alumni Dashboard (Home)
export default function UserHomePage() {
    return(
       <div className="flex">
                  <div className=" flex grow flex-col items-center">
                    
                        <div>
                        <img src="/graduation.jpg" className="w-96"/>
                        </div>
                        <img src="/graduation.jpg" className="w-96 mt-20"/>
                    
                  </div>
                  <div className="flex grow flex-col items-center">
                    
                        <img src="/calendar.png" className="w-96"/>
                        <img src="/students.jpg" className="w-96 mt-10"/>
                    
                  </div>
  
        </div>
            
    );
}