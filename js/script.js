jQuery(document).ready(function($){

    $('#loading-request').toggleClass('d-none');
    const request = axios.get('https://csc225.mockable.io/consoles');
    request.then(function(response){
        $('#loading-request').toggleClass('d-none');
        const consoles = response.data;
        const consolesHtml = consoles.map(function(co){
                const {id, name, image} = co;

                return `               
                    <div data-id="${id}" class="animate__animated animate__slideInRight card media my-4 cursor-pointer border-0" style="width: 18rem;">
                        <img src="${image}" class="mr-3 card-img-top" alt="Photo of ${co.name}>
                            <div class="card-body media-body">
                         <p class="name card-text">${co.name}</p>
                    </div>
                    </div>
                `;
        }).join('');

        $('#consoles').html(consolesHtml);
    });

        jQuery('#consoles').on('click', '.media', function(){
            const id = $(this).attr('data-id');
            const consoleURL = `https://csc225.mockable.io/consoles/${id}`;
            $('#console').html('');
            $('#loading-gif').toggleClass('d-none');

            axios.get(consoleURL).then(function(response){
                $('#loading-gif').toggleClass('d-none');
                const {id, name, price, country, releaseYear, image} = response.data;
                $('#console').html(`
                <div class="container card animate__animated animate__fadeIn border-0">
                        <div class="row"
                            <div class="col-12 col-lg-4 photo">
                                <img src="${image}" alt="Photo of ${name}">
                            </div>
                            <div class="card-body info col-12 col-lg-8">
                                 <p class ="m-0">Name: ${name}</p>
                                 <p class ="m-0">Price: $${price}</p>
                                 <p class ="m-0">Country: ${country}</p>
                                 <p class ="m-0">Release Year: ${releaseYear}</p>
                            </div>
                        </div>
                    
                    </div>

                
                `)
            }).catch(function(error){
                alert('error');
            });
        });


    
});


