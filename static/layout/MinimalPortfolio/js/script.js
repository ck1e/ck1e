const initProject = function () {
    let fulProject = document.querySelectorAll('.project'),
        projectPrev = document.querySelector('.project__previous'),
        projectNext = document.querySelector('.project__next'),
        btnFullProjects = document.querySelector('#mainProject'),
        quanFulProject = fulProject.length,
        quanShowProject = 3,
        numActiveProject = 0,
        chekFullProjects = false;

    function chekProject() {
        if (fulProject[0].classList.contains("project_show")) {
            projectPrev.disabled = true;
            projectNext.disabled = false;

            projectPrev.classList.add("btn_disable");
            projectPrev.classList.remove("btn");
            projectNext.classList.remove("btn_disable");
        } else if (fulProject[quanFulProject - 1].classList.contains("project_show")) {
            projectPrev.disabled = false;
            projectNext.disabled = true;

            projectPrev.classList.remove("btn_disable");
            projectNext.classList.add("btn_disable");
            projectNext.classList.remove("btn");
        } else {
            projectPrev.disabled = false;
            projectNext.disabled = false;

            projectPrev.classList.remove("btn_disable");
            projectPrev.classList.add("btn");
            projectNext.classList.remove("btn_disable");
            projectNext.classList.add("btn");
        }
    };

    for (let i = 0; i < quanFulProject; i++) {
        if (i < 3) {
            fulProject[i].classList.toggle("project_show");
            fulProject[0].classList.toggle("project_active");
        } else {
            fulProject[i].classList.toggle("project_hide");
        }

    };

    chekProject();

    projectPrev.onclick = () => {
        let projectActive = document.querySelector('.project_active');
        projectActive.classList.toggle("project_active");

        fulProject[numActiveProject + quanShowProject - 1].classList.toggle("project_show");
        fulProject[numActiveProject + quanShowProject - 1].classList.toggle("project_hide");

        numActiveProject--;

        fulProject[numActiveProject].classList.toggle("project_hide");
        fulProject[numActiveProject].classList.toggle("project_show");
        fulProject[numActiveProject].classList.toggle("project_active");

        chekProject();

        if (numActiveProject + quanShowProject == quanFulProject - 1) {
            btnFullProjects.disabled = false;
            btnFullProjects.classList.toggle("btn_disable");
            btnFullProjects.classList.toggle("btn");
            btnFullProjects.querySelector('.fa-long-arrow-alt-down').classList.toggle("fas");
        }
    };

    projectNext.onclick = () => {
        let projectActive = document.querySelector('.project_active');
        projectActive.classList.toggle("project_show");
        projectActive.classList.toggle("project_hide");
        projectActive.classList.toggle("project_active");

        fulProject[numActiveProject + quanShowProject].classList.toggle("project_show");
        fulProject[numActiveProject + quanShowProject].classList.toggle("project_hide");

        numActiveProject++;

        fulProject[numActiveProject].classList.toggle("project_active");

        chekProject();

        if (numActiveProject + quanShowProject == quanFulProject) {
            btnFullProjects.disabled = true;
            btnFullProjects.classList.toggle("btn_disable");
            btnFullProjects.classList.toggle("btn");
            btnFullProjects.querySelector('.fa-long-arrow-alt-down').classList.toggle("fas");
        }

    };

    btnFullProjects.onclick = () => {
        if (!chekFullProjects) {
            let nowNumActiveProject = 0;

            for (let i = 0; i < quanFulProject; i++) {
                if (fulProject[i].classList.contains("project_active")) {
                    nowNumActiveProject = i;
                };
            };

            for (let i = nowNumActiveProject; i < quanFulProject; i++) {
                fulProject[i].classList.add("project_show");
                fulProject[i].classList.remove("project_hide");
            };

            chekFullProjects = true;
            btnFullProjects.querySelector('.fa-long-arrow-alt-up').classList.toggle("fas");
            btnFullProjects.querySelector('.fa-long-arrow-alt-down').classList.toggle("fas");

            projectPrev.disabled = true;
            projectNext.disabled = true;

            projectPrev.classList.add("btn_disable");
            projectPrev.classList.remove("btn");
            projectNext.classList.add("btn_disable");
            projectNext.classList.remove("btn");

        } else if (chekFullProjects) {
            let nowNumActiveProject = 0;

            for (let i = 0; i < quanFulProject; i++) {
                if (fulProject[i].classList.contains("project_active")) nowNumActiveProject = i;
            }
            for (let i = nowNumActiveProject + quanShowProject; i < quanFulProject; i++) {
                fulProject[i].classList.remove("project_show");
                fulProject[i].classList.add("project_hide");
            }
            chekFullProjects = false;
            btnFullProjects.querySelector('.fa-long-arrow-alt-up').classList.toggle("fas");
            btnFullProjects.querySelector('.fa-long-arrow-alt-down').classList.toggle("fas");

            projectPrev.disabled = false;
            projectNext.disabled = false;

            if (numActiveProject == 0) {
                projectPrev.classList.add("btn_disable");
                projectPrev.classList.remove("btn");
                projectNext.classList.remove("btn_disable");
                projectNext.classList.add("btn");
            } else {
                projectPrev.classList.remove("btn_disable");
                projectPrev.classList.add("btn");
                projectNext.classList.remove("btn_disable");
                projectNext.classList.add("btn");
            }
        }
    };
}
window.addEventListener("DOMContentLoaded", initProject);
