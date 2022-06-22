<!DOCTYPE html>

<head>

    <script>function showLoginForm() {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText)

                window.location.href = xhr.responseText;

            }else{
                alert(xhr.responseText)
            }
        };

        xhr.open('GET', 'Login?');
        xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');

        xhr.send();

    }</script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script >function showRegistrationForm() {
        window.location.href="register.html";}</script>
        
    
    <link rel="stylesheet" href="style.css" />
    <meta charset="UTF-8" />
    <meta name="description" content="Form" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body>
<div id="whole">
    <div class="flexboxrow">
        <div class="flexboxcolumn">
            <header>
                <h1>Welcome to our website</h1>
            </header>
            <div id="sub-header">thanks for visiting :)</div>
        </div>
    </div>
    <!--the under title grey line-->
    <div class="flexboxrow">
        <div id="undertitle">
        </div>
    </div>
    <div class="flexboxrow">

        <!--the we have a column to enter each type of form-->
        <!-- Basic Login information-->
        <div class="flexboxcolumn">

            <!--inside the column we have a flex-item to store the things-->
                <div class="flex-item">

                    <div class="flex-item-inside">
                        <table id="first_table">
                            <tr>
                                <th>
                                    <!--empty on purpose-->
                                </th>
                                <th>
                                    <div class="flex-item-title">Select an option from below</div>
                                </th>
                                <th>
                                    <!--empty on purpose-->
                                </th>
                            </tr>
                            <tr>
                                <th>Register here:</th>
                                <th><button class="button" onclick="showRegistrationForm()">Register</button>
                                </th>
                                <th></th>
                            </tr>
                            <tr>
                                <th>Login here:</th>
                                <th><button class="button" onclick="showLoginForm()">Login</button>
                                </th>
                                <th></th>
                            </tr>
                        </table>
                    </div>
                </div>


            </div>

    </div>


</div>
</body>

</html>
